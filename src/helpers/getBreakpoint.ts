import breakpoints from "@/shared/breakpoints";

const getBreakpoint = (
  breakpoint: { [key: string]: number },
  width: number
) => {
  if (width >= breakpoints.xs && width <= breakpoints.sm) {
    return breakpoint["sm"];
  } else if (width >= breakpoints.sm && width <= breakpoints.md) {
    return breakpoint["md"];
  } else if (width >= breakpoints.md && width <= breakpoints.lg) {
    return breakpoint["lg"];
  } else if (
    width >= breakpoints.xl ||
    (width >= breakpoints.lg && width <= breakpoints.xl)
  ) {
    return breakpoint["xl"];
  }
  return breakpoint["xs"];
};

export default getBreakpoint;
