interface HTTPHooksOptions {}

class HTTPHooks {
  private options: HTTPHooksOptions;

  public configure(options: HTTPHooksOptions) {
    this.options = options;
  }
}

export default new HTTPHooks();
