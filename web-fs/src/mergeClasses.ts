import classnames from 'classnames';

// TODO: MAKE THIS WORK WITH TYPESCRIPT.

export default function mergeClasses<TC1, TC2>(
  classes1: TC1 | undefined,
  classes2: TC2 | undefined,
): TC1 & TC2 {
  if (!classes1) {
    // @ts-ignore
    return classes2 || {};
  } else if (!classes2) {
    // @ts-ignore
    return classes1;
  }

  // @ts-ignore
  const finalClasses: TC1 & TC2 = { ...classes1 };

  for (const key in classes2) {
    if (finalClasses[key]) {
      // @ts-ignore
      finalClasses[key] = classnames(finalClasses[key], classes2[key]);
    } else {
      // @ts-ignore
      finalClasses[key] = classes2[key];
    }
  }

  return finalClasses;
}
