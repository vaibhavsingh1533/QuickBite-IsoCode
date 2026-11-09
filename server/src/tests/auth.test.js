import test from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import app from '../app.js'
import User from '../models/User.js'
import { integrationEnabled, useTestDatabase, makeUser } from './helpers.js'

useTestDatabase()
const maybe = integrationEnabled ? test : test.skip
process.env.JWT_SECRET ||= 'test-secret-only-use-in-isolated-test-environment-123456'
const registerPayload = { name: 'Test Customer', email: 'new@example.test', password: 'StrongPass123' }
maybe('registration persists a hashed password and sets an HTTP-only cookie', async () => {
  const response=await request(app).post('/api/auth/register').send(registerPayload).expect(201)
  assert.equal(response.body.data.user.email,'new@example.test')
  assert.equal(response.body.data.user.passwordHash,undefined)
  assert.match(response.headers['set-cookie'][0],/HttpOnly/i)
  const user=await User.findOne({email:registerPayload.email}).select('+passwordHash')
  assert.notEqual(user.passwordHash,registerPayload.password)
  assert.equal(await bcrypt.compare(registerPayload.password,user.passwordHash),true)
})
maybe('duplicate email is rejected', async()=>{await request(app).post('/api/auth/register').send(registerPayload).expect(201);await request(app).post('/api/auth/register').send({...registerPayload,email:' NEW@example.test '}).expect(409)})
maybe('invalid email and invalid input are rejected', async()=>{await request(app).post('/api/auth/register').send({...registerPayload,email:'bad'}).expect(400);await request(app).post('/api/auth/login').send({email:'not-an-email',password:'x'}).expect(400)})
maybe('login succeeds and wrong password fails', async()=>{await request(app).post('/api/auth/register').send(registerPayload).expect(201);await request(app).post('/api/auth/login').send({email:registerPayload.email,password:registerPayload.password}).expect(200);await request(app).post('/api/auth/login').send({email:registerPayload.email,password:'wrong'}).expect(401)})
maybe('logout clears cookie and current user requires a valid session',async()=>{await request(app).get('/api/auth/me').expect(401);const login=await request(app).post('/api/auth/register').send(registerPayload).expect(201);const cookie=login.headers['set-cookie'][0].split(';')[0];await request(app).get('/api/auth/me').set('Cookie',cookie).expect(200);const logout=await request(app).post('/api/auth/logout').set('Cookie',cookie).expect(200);assert.match(logout.headers['set-cookie'][0],/qb_auth=;/)})
maybe('invalid JWT and inactive user are rejected',async()=>{const inactive=await makeUser({email:'inactive@example.test',isActive:false});const token=jwt.sign({sub:inactive.id},process.env.JWT_SECRET,{algorithm:'HS256',issuer:'quickbite-api',audience:'quickbite-client',expiresIn:'1h'});await request(app).get('/api/auth/me').set('Cookie',`qb_auth=${token}`).expect(401);await request(app).get('/api/auth/me').set('Cookie','qb_auth=invalid-token').expect(401)})
