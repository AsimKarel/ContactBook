import { promises } from "dns";
import { Contact } from "../Models/Contact";
import { RequestModel } from "../Models/Request";
import pool from '../Middleware/Database'

const mysql = require('mysql');

export class DatabaseService {

    getContacts = (request: RequestModel) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Contacts where name like CONCAT('%', ?,  '%') or email like CONCAT('%', ?,  '%') ORDER BY " + request.sortBy + " " + request.sortOrder + " LIMIT ? OFFSET ?",
                [[request.searchQuery], [request.searchQuery], [request.take], [request.skip]],
                (er: Error, res: [Contact]) => {
                    if (er) {
                        reject(er);
                    }
                    else {
                        resolve(res);
                    }
                })
        });
    }

    saveContact = (contact: Contact) => {
        return new Promise((resolve, reject) => {
            pool.query("INSERT INTO Contacts(name, phone, email, country_code) values (?)",
                [[contact.name, contact.phone, contact.email, contact.country_code]], (er: Error, res: [Contact]) => {
                    if (er) {

                        reject(er);
                    }
                    else {
                        console.log(res);

                        resolve(res);
                    }
                })
        });
    }

    updateContact = (contact: Contact) => {
        return new Promise((resolve, reject) => {
            pool.query("UPDATE Contacts SET name=?, phone=?, email=?, country_code=? where id=?",
                [[contact.name], [contact.phone], [contact.email], [contact.country_code], [contact.id]], (er: Error, res: [Contact]) => {
                    if (er) {
                        console.log(er);
                        reject(er);
                    }
                    else {
                        console.log(res);

                        resolve(res);
                    }
                })
        });
    }

    deleteContact = (id: number) => {
        return new Promise((resolve, reject) => {
            pool.query("DELETE FROM Contacts WHERE ID=?", [[id]], (er: Error, res: [Contact]) => {
                if (er) {

                    reject(er);
                }
                else {

                    resolve(res);
                }
            })
        });
    }

}

