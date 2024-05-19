# json-translate

**This Node.js application uses the AWS Translate Service to generate translated text**. Follow the instructions below to set up and run the application.

## Prerequisites

Ensure you have **Node.js** (version 18 or higher) installed.

## Setup

1. **Clone the repository**

   ```bash
   $ git clone git@github.com:vctrlima/json-translate.git
   ```

2. **Install dependencies**

   ```bash
   $ npm install
   ```

3. **Set up environment variables**

   Create a .env file in the root directory of the project and add your AWS credentials and server configuration:

   ```properties
   SERVER_PORT=<your-server-port>
   AWS_ACCESS_KEY_ID=<your-aws-access-key-id>
   AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
   AWS_REGION=<your-aws-region>
   ```

## Running the Application

Start the server with the following command:

```bash
$ npm run start
```

The server will start on the port specified in your .env file.

## Usage

Once the server is running, you can make requests to the API endpoints to generate translated text. A Postman collection is available to simplify testing and usage. You can find the collection file in the docs/collections folder. Import this file into Postman to access the predefined requests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
