import { promises } from "dns";
import { Contact } from "../Models/Contact";
import { RequestModel } from "../Models/Request";
import { connect } from "http2";

const mysql = require('mysql');

export class DatabaseService {

    dbConfig = {
        host: "bupmqtonwvl4hxqgf1ws-mysql.services.clever-cloud.com",
        user: "uamg8fiyaqmjxpg7",
        password: "oDd1ijsy8F8xDa4x46cl",
        database: "bupmqtonwvl4hxqgf1ws",
        port:3306,
    };
    connection = mysql.createConnection(this.dbConfig);

    constructor() {
        setInterval(() => {
            this.connection.query('SELECT 1');
        }, 5000);
        // mysql://uamg8fiyaqmjxpg7:oDd1ijsy8F8xDa4x46cl@bupmqtonwvl4hxqgf1ws-mysql.services.clever-cloud.com:3306/bupmqtonwvl4hxqgf1ws
    }

    getContacts = (request: RequestModel) => {
        return new Promise((resolve, reject) => {
            this.connection.connect((connectionError: Error) => {
                if (connectionError) {
                    console.log(connectionError)
                    // reject(connectionError);
                    this.handleDisconnect();
                }
                console.log("Connected!");
                this.connection
                    .query("SELECT * FROM Contacts where name like CONCAT('%', ?,  '%') or email like CONCAT('%', ?,  '%') ORDER BY "+request.sortBy+" "+request.sortOrder+" LIMIT ? OFFSET ?",
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
        })
    }

    saveContact = (contact: Contact) => {
        return new Promise((resolve, reject) => {
            this.connection.connect((connectionError: Error) => {
                if (connectionError) {
                    // reject(connectionError);
                    this.handleDisconnect();
                }
                console.log("Connected!");
                this.connection
                    .query("INSERT INTO Contacts(name, phone, email, country_code) values (?)",
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
        })
    }

    updateContact = (contact: Contact) => {
        return new Promise((resolve, reject) => {
            this.connection.connect((connectionError: Error) => {
                if (connectionError) {
                    // reject(connectionError);
                    this.handleDisconnect();
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
                                
                                resolve(res);
                            }
                        })
            });
        })
    }

    deleteContact = (id: number) => {
        return new Promise((resolve, reject) => {
            this.connection.connect((connectionError: Error) => {
                if (connectionError) {
                    // reject(connectionError);
                    this.handleDisconnect();
                }
                console.log("Connected!");
                this.connection.query("DELETE FROM Contacts WHERE ID=?", [[id]], (er: Error, res: [Contact]) => {
                    if (er) {
                        
                        reject(er);
                    }
                    else {
                        
                        resolve(res);
                    }
                })
            });
        })
    }


    handleDisconnect() {
        try{
            console.log('error coooo')
            this.connection = mysql.createConnection(this.dbConfig);
        }
        catch{
            this.handleDisconnect()
        }
        
        
    }
      
}

