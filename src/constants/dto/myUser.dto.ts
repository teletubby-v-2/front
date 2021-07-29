export interface CreateUserEmailDto {
  userId: string
  email: string
  displayName: string
  password: string
}

export interface UpdateProfile {
  photoURL?: string
  displayName?: string
  aboutme?: string
  socialLinkIG?: string
  socialLinkFB?: string
  socialLinkYT?: string
  donatePicture?: string
  aboutDonate?: string
}
