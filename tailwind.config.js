module.exports = {
  purge: ['./app/**/*.{js,jsx}'], // Here we are going to tell Tailwind to use any javascript .js or .jsx file
  theme: {
    extend: {
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
    },
  },
  variants: {},
  plugins: [],
};
