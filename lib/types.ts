export interface User {
  id: number
  name: string
  email: string
  role: "admin" | "user" | "driver"
  createdAt: string
}

export interface Car {
  id: number
  name: string
  brand: string
  model: string
  year: number
  price: number
  image: string
  available: boolean
  createdAt: string
}

export interface Rent {
  id: number
  userId: number
  carId: number
  car?: Car
  user?: User
  startDate: string
  endDate: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

export interface Bid {
  id: number
  rentId: number
  driverId: number
  rent?: Rent
  driver?: User
  amount: number
  message: string
  status: "pending" | "accepted" | "rejected"
  createdAt: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface LoginData {
  accessToken: string
  refreshToken: string
  user: User
}

export interface RegisterData {
  accessToken: string
  refreshToken: string
  user: User
}
