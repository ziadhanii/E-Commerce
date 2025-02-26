export interface product {
  _id: string
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
