export interface UseCaseInterface {
  execute(input?: unknown): Promise<any>
}
