# Disaster Coordination & Emergency Resource Management System

A small web-based simulation for managing disaster incidents, rescue teams, and emergency resources.

## Project Objective

The system demonstrates how a cloud-ready application can coordinate disaster information and emergency resources through REST APIs.

This project is a simulation for academic purposes and is not intended for real emergency operations.

## Features

- Report new disaster incidents
- View active disasters
- Manage rescue teams
- Assign available rescue teams to disasters
- View emergency resources
- Allocate medical and emergency resources
- REST API based communication
- Automated API testing
- Docker containerization
- GitHub Actions CI pipeline

## Technology Stack

- Node.js
- Express.js
- HTML
- CSS
- JavaScript
- Jest
- Supertest
- Docker
- GitHub Actions

## System Architecture

```text
                 User / Operator
                       |
                       v
              Web Dashboard
                       |
                       v
              Node.js + Express
                       |
          +------------+------------+
          |            |            |
          v            v            v
      Disaster      Rescue       Resource
        API          API           API
          |            |            |
          +------------+------------+
                       |
                       v
                  Docker
                       |
                       v
                 Cloud Deployment
                       |
                       v
                 GitHub Actions