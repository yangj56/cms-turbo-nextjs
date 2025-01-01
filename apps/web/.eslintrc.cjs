module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        name: "next/link",
        message: "Please import from `~/i18n/routing` instead.",
      },
      {
        name: "next/navigation",
        importNames: [
          "redirect",
          "permanentRedirect",
          "useRouter",
          "usePathname",
        ],
        message: "Please import from `~/i18n/routing` instead.",
      },
    ],
  },
};
