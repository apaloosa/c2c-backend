# Generic C2C Backend

A generic C2C backend being developed as a proof of concept (and learning
nodejs!).

The idea is to create a simplistic c2c site that can be customized easily.

## Current status

This is a work in progress and *is not currently functional*.  Most basic
functionality is still being developed.

Expect this to be heavily updated.

## Checkout



### Clone the repository
```bash
$ git clone https://github.com/apaloosa/c2c-backend.git && cd c2c-backend
```
### Install dependencies
```bash
$ npm install
```

### Run the tests

The tests relies on a SH being accessilble in localhost 9200

```bash
$ mocha
```

## Tools used

- Chai
- Mocha for test runner
- Elastic Search


## Basics

C2C backends are always about user generated **ads**, so the content is
generated by users and consumed by other users.  

So there are two main actors in this kind of applications:

- The user that offers something (let's call him seller).  The seller should
be able to:
 - Post a new add
 - Update an already posted ad
 - Close an ad.

- The user that is looking to buy something (let's call him buyer).  The buyer
should be able to:
 - View an ad
 - List ads by certain criteria
  - By **category**
  - By **Location**
  - By **attributes**
  - By a search

- Other functionality like C2C is not included, at least not yet.

## Locations and Categories

Locations and categorie are very similar in many aspects:

- They both can be defined using a tree.
- Usually an add is related to one category and one locations
- Users browsing one category expect to view the ads related to that category
or it's childs.  The same with a location.

Locations and categories are two ways of categorizating ads by using trees.


# Attributes

Attributes are values that are to be associated with an ad for a given
location or/and category.

For example:  The category cars should have a brand, model
and year.  In some countries or states it may need to also include the mileage.

An attribute can be assigned to the intersection of the following groups:

- Classifier 1 and children
- Classifier 2 and children


## Backend desisions

Since this is only a PoC, it should be as simple as possible.

- Since the basic functionality of a C2C site includes searching for ads,
we will use ElasticSearch(ES).
- For simplicity, documents will are stored ONLY in ES.
- The backend is should offer a REST interface
- For simplicity, it should be possible to use as a node library
- All validations related with sessions, like updating an ad are expected
to be implemented in upper layers
