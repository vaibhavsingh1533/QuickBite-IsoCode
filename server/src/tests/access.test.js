import test from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../app.js'
import MenuItem from '../models/MenuItem.js'
import { integrationEnabled, useTestDatabase, makeUser } from './helpers.js'
process.env.JWT_SECRET ||= 'test-secret-only-use-in-isolated-test-environment-123456'
useTestDatabase()
const maybe=integrationEnabled?test:test.skip
function session(user){return `qb_auth=${jwt.sign({sub:user.id},process.env.JWT_SECRET,{algorithm:'HS256',issuer:'quickbite-api',audience:'quickbite-client',expiresIn:'1h'})}`}
maybe('customer cannot access kitchen and kitchen staff cannot access customer order APIs',async()=>{const customer=await makeUser();const staff=await makeUser({email:'staff@example.test',role:'kitchen_staff'});await request(app).get('/api/kitchen/orders').set('Cookie',session(customer)).expect(403);await request(app).get('/api/orders').set('Cookie',session(staff)).expect(403)})
maybe('menu returns only available database records and supports filters',async()=>{await MenuItem.create([{name:'Soup',description:'Soup of the day',category:'Lunch',price:100,preparationTime:10,isAvailable:true},{name:'Hidden item',description:'Unavailable',category:'Lunch',price:200,preparationTime:10,isAvailable:false}]);const response=await request(app).get('/api/menu?category=Lunch').expect(200);assert.equal(response.body.success,true);assert.equal(response.body.data.items.length,1);assert.equal(response.body.data.items[0].name,'Soup')})
maybe('invalid menu filter and kitchen status update body are rejected',async()=>{const staff=await makeUser({email:'staff@example.test',role:'kitchen_staff'});await request(app).get('/api/kitchen/orders?status=unknown').set('Cookie',session(staff)).expect(400);await request(app).patch('/api/kitchen/orders/000000000000000000000001/status').set('Cookie',session(staff)).send({status:'queued'}).expect(400)})
