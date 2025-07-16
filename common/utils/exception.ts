export class Exception extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'Exception'
    this.status = status

    // 👇 ini penting agar instance Error bekerja dengan baik
    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace?.(this, this.constructor)
  }
}
