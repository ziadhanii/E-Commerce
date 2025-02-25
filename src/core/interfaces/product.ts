export interface product {
  title: string
  price: number
  imageCover: string
  ratingsQuantity: number
  category: CategoryProd
  ratingsAverage: number
}

export interface CategoryProd {
  name: string
}
