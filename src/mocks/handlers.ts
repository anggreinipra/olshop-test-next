// src/mocks/handlers.ts
import { rest } from 'msw';

// Definisikan tipe untuk request body
interface LoginRequestBody {
  email: string;
  password: string;
}

export const handlers = [
  rest.post(
    'https://jsonplaceholder.typicode.com/users',
    async (req, res, ctx) => {
      // Menunggu body request diparse menjadi objek JSON
      const { email, password }: LoginRequestBody = await req.json();

      // Simulasi login sukses jika email dan password cocok
      if (email === 'test@example.com' && password === 'password123') {
        return res(
          ctx.status(200),
          ctx.json({
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            role: 'Admin',
          })
        );
      }

      // Simulasi login gagal jika kredensial tidak valid
      return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }));
    }
  ),
];
