
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/types/user';
import { useToast } from '@/hooks/use-toast';
import { Edit, Save, X, Shield, User as UserIcon } from 'lucide-react';
import ImageUpload from '@/components/ui/image-upload';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(user?.profileImage || null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Partial<User>>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || ''
    }
  });

  const handleImageSelect = (file: File | null, preview: string | null) => {
    setProfileImagePreview(preview);
  };

  const onSubmit = async (data: Partial<User>) => {
    try {
      const updatedData = {
        ...data,
        profileImage: profileImagePreview
      };
      
      updateProfile(updatedData);
      setIsEditing(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    reset({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || ''
    });
    setProfileImagePreview(user?.profileImage || null);
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="text-center py-8">
            <p>Please log in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and account settings
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profileImagePreview || user.profileImage} alt={user.firstName} />
                  <AvatarFallback className="text-lg">
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">
                    {user.firstName} {user.lastName}
                  </CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role === 'admin' ? (
                        <Shield className="h-3 w-3 mr-1" />
                      ) : (
                        <UserIcon className="h-3 w-3 mr-1" />
                      )}
                      {user.role}
                    </Badge>
                    <Badge variant={user.isVerified ? 'outline' : 'destructive'}>
                      {user.isVerified ? 'Verified' : 'Unverified'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {isEditing && (
                <>
                  <ImageUpload
                    onImageSelect={handleImageSelect}
                    currentImage={profileImagePreview}
                    label="Profile Picture"
                  />
                  <Separator />
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      {...register('firstName', {
                        required: 'First name is required',
                        minLength: {
                          value: 2,
                          message: 'First name must be at least 2 characters'
                        }
                      })}
                      className={errors.firstName ? 'border-destructive' : ''}
                    />
                  ) : (
                    <p className="text-sm py-2 px-3 bg-muted rounded-md">{user.firstName}</p>
                  )}
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      {...register('lastName', {
                        required: 'Last name is required',
                        minLength: {
                          value: 2,
                          message: 'Last name must be at least 2 characters'
                        }
                      })}
                      className={errors.lastName ? 'border-destructive' : ''}
                    />
                  ) : (
                    <p className="text-sm py-2 px-3 bg-muted rounded-md">{user.lastName}</p>
                  )}
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                ) : (
                  <p className="text-sm py-2 px-3 bg-muted rounded-md">{user.email}</p>
                )}
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Account Created</Label>
                  <p className="text-sm py-2 px-3 bg-muted rounded-md">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>User ID</Label>
                  <p className="text-sm py-2 px-3 bg-muted rounded-md font-mono">
                    {user.id}
                  </p>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
