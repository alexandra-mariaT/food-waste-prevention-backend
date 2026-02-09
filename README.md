🌿 Food Waste Prevention API
This is a backend system developed to reduce food waste by connecting local businesses with customers. Shop owners can list surplus food at reduced prices, and users can reserve these items in real-time.

🛠 Tech Stack

- Framework: NestJS (TypeScript)
- Database: PostgreSQL & Knex.js
- Containerization: Docker
- Security: JWT Authentication & Role-Based Access Control (RBAC)
- Documentation: Swagger UI

💡 Key Features

- Dual-Role System: Secure separation between restaurant (owners) and client users.
- Atomic Reservations: Real-time stock management. Reserving an item automatically updates the inventory and checks availability using SQL transactions.
- Owner Protection: Security guards ensure that only the rightful owner of a shop can manage its products.
- API Documentation: Fully interactive Swagger interface for testing the business logic without a frontend.

🚀 Getting Started

1. Clone & Install
   
$ git clone https://github.com/alexandra-mariaT/food-waste-prevention-backend.git

$ cd food-waste-prevention-backend

$ npm install

3. Database Setup
   
Ensure Docker is running and start the PostgreSQL container:

$ docker-compose up -d

5. Run the Application

$ npm run start:dev

📖 API Testing (Swagger)

Once the server is running, you can explore and test the entire flow (Login -> Create Product -> Reserve) at: 👉 http://localhost:3000/api

🎯 Roadmap (Future Implementations)

- Pickup Scheduling: Implementing specific time windows for each offer (e.g., "Pickup available between 18:00 - 20:00") to help shops manage surplus collection.
- QR Code Integration: Generating a unique QR code for each reservation for instant in-store validation.
- Email Notifications: Automatic confirmation emails for both shops and customers when a reservation is made.

📄 License
Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
