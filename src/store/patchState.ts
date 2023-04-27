export default function patchState<T extends {}>(target: T, source: T) {
  Object.assign(target, source);
}
