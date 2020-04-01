import { promises } from "dns";
import { Contact } from "../Models/Contact";
import { RequestModel } from "../Models/Request";

const mysql = require('mysql');

export class DatabaseService {

    connection = mysql.createConnection({
        
    });

    constructor() {

    }

    getContacts = (request: RequestModel) => {
        return new Promise((resolve, reject) => {
            this.connection.connect((err: Error) => {
                if (err) {
                    throw err;
                    reject(err);
                }
                console.log("Connected!");
                this.connection
                    .query("SELECT * FROM Contacts where name like CONCAT('%', ?,  '%') or email like CONCAT('%', ?,  '%') ORDER BY ? ? LIMIT ? OFFSET ?",
                        [[request.searchQuery], [request.searchQuery], [request.sortBy], [request.sortOrder], [request.take], [request.skip]],
                        (er: Error, res: [Contact]) => {
                            if (er) {
                                this.connection.end();
                                reject(er);
                            }
                            else {
                                this.connection.end();
                                resolve(res);
                            }
                        })
            });
        })
    }

    saveContact = (contact: Contact) => {
        return new Promise((resolve, reject) => {
            this.connection.connect((err: Error) => {
                if (err) {
                    throw err;
                    reject(err);
                }
                console.log("Connected!");
                this.connection
                    .query("INSERT INTO Contacts(name, phone, email, country_code) values (?)",
                        [[contact.name, contact.phone, contact.email, contact.country_code]], (er: Error, res: [Contact]) => {
                            if (er) {
                                this.connection.end();
                                reject(er);
                            }
                            else {
                                console.log(res);
                                this.connection.end();
                                resolve(res);
                            }
                        })
            });
        })
    }

    updateContact = (contact: Contact) => {
        return new Promise((resolve, reject) => {
            this.connection.connect((err: Error) => {
                if (err) {
                    throw err;
                    reject(err);
                }
                console.log(contact);
                this.connection
                    .query("UPDATE Contacts SET name=?, phone=?, email=?, country_code=? where id=?",
                        [[contact.name], [contact.phone], [contact.email], [contact.country_code], [contact.id]], (er: Error, res: [Contact]) => {
                            if (er) {
                                console.log(er);
                                reject(er);
                            }
                            else {
                                console.log(res);
                                this.connection.end();
                                resolve(res);
                            }
                        })
            });
        })
    }

    deleteContact = (id: number) => {
        return new Promise((resolve, reject) => {
            this.connection.connect((err: Error) => {
                if (err) {
                    throw err;
                    reject(err);
                }
                console.log("Connected!");
                this.connection.query("DELETE FROM Contacts WHERE ID=?", [[id]], (er: Error, res: [Contact]) => {
                    if (er) {
                        this.connection.end();
                        reject(er);
                    }
                    else {
                        this.connection.end();
                        resolve(res);
                    }
                })
            });
        })
    }
}

