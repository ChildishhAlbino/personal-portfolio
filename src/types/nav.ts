export type NavOptions = {
  LEFT_PORTAL: string
  POSTS: string
  ABOUT: string
  RESUME: string
  RIGHT_PORTAL: string
}

export type CurrentPageType = keyof NavOptions
