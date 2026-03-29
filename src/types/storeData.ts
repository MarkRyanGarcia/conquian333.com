export interface Review {
  id: string
  author: string
  rating: number
  text: string
  date: string
  source: 'appstore' | 'playstore'
  avatar?: string
}

export interface StoreData {
  appStore: {
    rating: number
    ratingCount: number
    reviews: Review[]
  }
  playStore: {
    rating: number
    ratingCount: number
    installs: string
    reviews: Review[]
  }
}
