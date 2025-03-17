module.exports = {
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',  // Tells Jest to use Babel to transform TypeScript files
    },
    // If you're using module aliases (e.g., "@/utils/storage"), add this:
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',  // Adjust this based on your actual folder structure
    },
    testEnvironment: 'node',  // Use 'node' environment for backend testing
};
