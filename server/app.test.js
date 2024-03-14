// const { expect } = require('chai');
const { response } = require('express');
const request = require('supertest');
const app = require('./index').app;
// const { describe } = require('mocha');

describe('REST API for Employees',()=>{
    it('get all Employees',()=>{
        return request(app)
        .get('/api/employees')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        _id: expect.any(String),
                        fullName: expect.any(String),
                        position: expect.any(String),
                        location: expect.any(String),
                        salary: expect.any(Number)
                    })
                ])
            )
        })
    })
    it('get specific Employee by id',()=>{
        return request(app)
        .get('/api/employees/657d486e820e27432d8437dc')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).toEqual(
                    expect.objectContaining({
                        _id: expect.any(String),
                        fullName: expect.any(String),
                        position: expect.any(String),
                        location: expect.any(String),
                        salary: expect.any(Number)
                    })
            )
        })
    })
    it('Throw 404 error if eployee record is not found',()=>{
        return request(app).get('/api/employees/657d486e820e27432d8')
    })
    it('Create user',()=>{
        return request(app)
        .post('/api/employees')
        .send({
            fullName: 'Divya Raghavan',
            position: 'Intern',
            location: 'Kochi',
            salary: 1000
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    _id: expect.any(String),
                    fullName: 'Divya Raghavan',
                    position: 'Intern',
                    location: 'Kochi',
                    salary: 1000
                })
        )
        })
    })
    it('Validate Employee Salary field for data type',()=>{
        return request(app).post('/api/employees').send({
            fullName: 'Divya Raghavan',
            position: 'Intern',
            location: 'Kochi',
            salary: 'thousand'
        })
        .expect(500)
    })
    it('Should Modify Full Name of the user',()=>{
        return request(app)
        .put('/api/employees/657d486e820e27432d8437dc')
        .send({ fullName: 'Sachin Bhagath'})
        .expect(200)
    })
    it('Should Delete specific user',()=>{
        return request(app)
        .delete('/api/employees/65d9c0ffac89903a457a5f9c')
        .expect(200)
    })
})
