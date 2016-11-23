module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "plugins": [
        "react",
        // "jsx-a11y",
        "import"
    ],
    "rules": {
        "eol-last": "off",
        "import/prefer-default-export": "off",
        "react/jsx-filename-extension": "off",
        "no-underscore-dangle": "off",
        "no-use-before-define": "off",
        "react/no-unused-prop-types": "off", // false positives
        "react/forbid-prop-types": "off", // TODO: Add back
        "no-case-declarations": "off", // TODO: Add back
        "no-cond-assign": "off", // has some practical uses
        "class-methods-use-this": "off", // this seems like a weird rule
        "arrow-parens": "off",
        "react/prop-types": "off", // TODO: Add this back
        "import/no-unresolved": "off", // false positives
        "import/extensions": "off", // false positives
        "react/jsx-closing-bracket-location": "off", // TODO: Add back later
        "react/jsx-indent": "off", // TODO: Add back later
        "semi": "off", // TODO: Add back later
        "comma-dangle": "off", // TODO: Add back
        "react/jsx-curly-spacing": "off", // TODO: Maybe add back? Seems unnecessary
        "indent": "off", // TODO: Definitely add back later
        "space-before-blocks": "off", // not that important
        "react/jsx-indent-props": "off", // TODO: Add back later
        "max-len": "off", // Maybe add back later.
    }
};