// src/lib/api.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { get, post, put, del } from './api';
import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handlers';
import { http, HttpResponse } from 'msw'; // Import http and HttpResponse

const server = setupServer(...handlers);


beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});


describe('API Utility', () => {
    it('should make a GET request and return data', async () => {
      const mockData = [
          {
            id: 1,
            user_id: 1,
            loved_one_name: 'John Doe',
            slug: 'john-doe',
            created_at: '2023-01-01',
            updated_at: '2023-01-02',
            custom_html: '<p>Custom HTML</p>',
            phone_number: '123-456-7890',
          },
        ];

      server.use(
        http.get('http://localhost/wp-json/tributes', () => {
          return HttpResponse.json(mockData);
        })
      )
        const data = await get<any>('/tributes');
        expect(data).toEqual(mockData);
    });

    it('should make a POST request and return data', async () => {
      const mockData = {
        id: 2,
        user_id: 1,
        loved_one_name: 'Jane Doe',
        slug: 'jane-doe',
        created_at: '2023-01-01',
        updated_at: '2023-01-02',
        custom_html: '<p>Custom HTML</p>',
        phone_number: '123-456-7890',
      }
      const postData = {
        user_id: 1,
        loved_one_name: 'Jane Doe',
        slug: 'jane-doe',
        created_at: '2023-01-01',
        updated_at: '2023-01-02',
        custom_html: '<p>Custom HTML</p>',
        phone_number: '123-456-7890',
      }
        server.use(
          http.post('http://localhost/wp-json/tributes', async() => {
            return HttpResponse.json(mockData, { status: 201 })
          })
        )
        const data = await post<any, any>('/tributes', postData);
      expect(data).toEqual(mockData)
    });

    it('should make a PUT request and return updated data', async () => {
      const mockData = {
          id: 2,
          user_id: 1,
          loved_one_name: 'Jane Doe Updated',
          slug: 'jane-doe',
          created_at: '2023-01-01',
          updated_at: '2023-01-02',
          custom_html: '<p>Custom HTML</p>',
          phone_number: '123-456-7890',
        };
        const putData = {
          user_id: 1,
          loved_one_name: 'Jane Doe Updated',
          slug: 'jane-doe',
          created_at: '2023-01-01',
          updated_at: '2023-01-02',
          custom_html: '<p>Custom HTML</p>',
          phone_number: '123-456-7890',
        }
        server.use(
           http.put('http://localhost/wp-json/tributes/2', async() => {
            return HttpResponse.json(mockData)
           })
        )
        const data = await put<any, any>('/tributes/2', putData);
        expect(data).toEqual(mockData);
    });

    it('should make a DELETE request and return a message', async () => {
        server.use(
            http.delete('http://localhost/wp-json/tributes/2', async() => {
            return HttpResponse.json({ message: `Tribute with ID 2 deleted` });
            })
         )
        const data = await del<any>('/tributes/2');
        expect(data).toEqual({ message: `Tribute with ID 2 deleted` });
    });

     it('should handle errors when a GET request fails', async () => {
        server.use(
            http.get('http://localhost/wp-json/tributes', async() => {
             return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' })
          })
        )
          try {
              await get('/tributes')
          } catch (e:any) {
              expect(e.status).toBe(500)
             expect(e.message).toBe('API Error: 500 Internal Server Error')
        }
      });

      it('should handle errors when a POST request fails', async () => {
        server.use(
            http.post('http://localhost/wp-json/tributes', async() => {
              return new HttpResponse(null, { status: 400, statusText: 'Bad Request' })
          })
        )
        try {
          await post('/tributes', {  
            user_id: 1,
            loved_one_name: 'Jane Doe',
            slug: 'jane-doe',
            created_at: '2023-01-01',
            updated_at: '2023-01-02',
            custom_html: '<p>Custom HTML</p>',
            phone_number: '123-456-7890',
        })
        } catch(e:any) {
          expect(e.status).toBe(400)
          expect(e.message).toBe('API Error: 400 Bad Request')
        }
    });
});