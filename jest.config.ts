/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  transform: {
    '^.+.(t|j)sx?$': ['@swc/jest'],
  },
  clearMocks: true,
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/src/modules/@shared/$1',
    '^@client-adm/(.*)$': '<rootDir>/src/modules/client-adm/$1',
    '^@payment/(.*)$': '<rootDir>/src/modules/payment/$1',
    '^@product-adm/(.*)$': '<rootDir>/src/modules/product-adm/$1',
    '^@store-catalog/(.*)$': '<rootDir>/src/modules/store-catalog/$1',
  },
}
