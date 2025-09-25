class ApiResponse{
  constructor(statuCode, data, message = "success"){
    this.statuCode = statuCode,
    this.data = data,
    this.message = message
    this.success = statuCode < 400
  }
}

export default ApiResponse;