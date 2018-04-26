module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        // "jsx-a11y",
        "import"
    ],
    "env": {
        "jest": true
    },
    "globals": {
        "fetch": false
    },
    "rules": {
        "eol-last": "off",
        "import/prefer-default-export": "off",
        "react/jsx-filename-extension": "off",
        "no-underscore-dangle": "off",
        "no-use-before-define": "off",
        "react/no-unused-prop-types": "off", // false positives
        "no-cond-assign": "off", // has some practical uses
        "class-methods-use-this": "off", // this seems like a weird rule
        "arrow-parens": "off",
        "react/jsx-curly-spacing": "off", // TODO: Maybe add back? Seems unnecessary
        "import/no-unresolved": "off", // false positives
        "import/extensions": "off", // false positives
        "space-before-blocks": "off", // not that important
        "max-len": "off", // Maybe add back later.

        "react/jsx-closing-bracket-location": "off", // TODO: Add back later
        "react/jsx-indent": "off", // TODO: Add back later
        "comma-dangle": "off", // TODO: Add back
        "indent": "off", // TODO: Definitely add back later
        "react/jsx-indent-props": "off", // TODO: Add back later
        "react/forbid-prop-types": "off", // TODO: Add back
        "no-case-declarations": "off", // TODO: Add back
        "react/prop-types": "off",
        "react/require-default-props": "off",
        "react/prefer-stateless-function": [2, { "ignorePureComponent": true }]
    }
};
