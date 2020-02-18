export abstract class Failure {}

export class ServerFailure implements Failure {}

export class ServerEmptyFailure implements Failure {}

export class CacheFailure implements Failure {}
