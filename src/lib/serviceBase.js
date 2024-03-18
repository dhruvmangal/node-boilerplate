import _ from "lodash";
export default class ServiceBase {

  #_args = {}
  #_context = {}
  #_errors = {}
  #_successful = null
  #_failed = null
  #_result = null

  constructor () {
    this.#_args  = arguments[0]
    this.#_context = arguments[1] 
    this.#_errors = {}
    this.#_successful = null
    this.#_failed = null
    this.#_result = null
  }

  get context () {
    return this.#_context
  }

  get args () {
    return this.#_args
  }

  get result(){
    return this.#_result
  }

  get errors(){
    return this.#_errors
  }

  get successful() {
    return this.#_successful
  }

  log(){
    
  }

  async #tryExecuting () {
    if(_.size(this.errors)){
      this.#_failed = true
      this.#_successful = false
      return 
    }

    try{
      this.#_result = await this.run()
      console.log(this.#_result, "result")
    }catch(error){
      console.log(`Exception raised in the service, ${error.message}`)
    }

    this.#_successful = !_.size(this.errors)
    this.#_failed = !!_.size(this.errors)
  }

  static async run(){
    const args = arguments
    const instance  = new this(...args)

    await instance.#tryExecuting()
    return instance
  }

  static async execute(){
    const args = arguments
    const instance  = new this(...args)

    await instance.#tryExecuting()
    return instance
  }
}