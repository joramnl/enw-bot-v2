const fs = require('fs');

module.exports = class EnwFilter {

  getFilteredGroups() {
    return [
      '818801187603480606'
    ];
  }

    /**
     * Gets a list of userids that are being filtered
     *
     * @returns {Promise<Array>}
     */
    getFilteredUsers() {
      return new Promise((resolve, reject) => {
        this.readFile("filtered_users.json")
          .then(result => resolve(result))
          .catch(reason => {
            reject("failed retrieving");
            console.error("error", reason);
          });
      });
    }

    /**
     * Adds a user to the JSON file
     *
     * @param userid
     * @returns {Promise<Array, String>}
     */
    async addFilteredUser(userid) {
        return new Promise(((resolve, reject) => {
            this.getFilteredUsers()
                .then(users => {
                    if (users.includes(userid)) reject("User already in filtered users list");

                    users.push(userid);

                    this.validateFile("filtered_users.json");
                    fs.writeFile("filtered_users.json", JSON.stringify(users), err => {
                        if (err) {
                            reject("Could not add user to filtered list: " + err.message);
                        } else {
                            resolve(`Added <@${userid}> to the filtered user list.`);
                        }
                    });
                })
                .catch(err => reject(err.message));
        }));
    }

    /**
     * Adds a pattern to the JSON file
     *
     * @returns {Promise<void>}
     */
    async addPattern(pattern, sanitize) {
       return new Promise((resolve, reject) => {
           this.getPatterns()
               .then(patterns => {
                   let _pattern = (sanitize) ? this.escapeRegExp(pattern) : pattern;

                   if (patterns.includes(_pattern)) reject("Word is already in filtered words list");

                   patterns.push(_pattern);

                   this.validateFile("filtered_patterns.json");
                   fs.writeFile("filtered_patterns.json", JSON.stringify(patterns), err => {
                       if (err) {
                           reject("Could not add user to filtered words: " + err.message);
                       } else {
                           resolve(`Added ${pattern} to the filtered words list.`);
                       }
                   });
               });
       });
    }

    /**
     * Removes a pattern from the JSON file
     *
     * @returns {Promise<void>}
     */
    async removePattern(pattern, sanitize) {
        return new Promise((resolve, reject) => {
            this.getPatterns()
                .then(patterns => {
                    let _pattern = (sanitize) ? this.escapeRegExp(pattern) : pattern;

                    if (!patterns.includes(_pattern)) reject("Word is not in filtered words list");

                    let index = patterns.indexOf(pattern);
                    if (index !== -1) {
                        patterns.splice(index, 1);
                    }

                    this.validateFile("filtered_patterns.json");
                    fs.writeFile("filtered_patterns.json", JSON.stringify(patterns), err => {
                        if (err) {
                            reject("Could not remove word from filtered words: " + err.message);
                        } else {
                            resolve(`Removed '${pattern}' from the filtered words list.`);
                        }
                    });
                });
        });
    }

    /**
     * Removes a userid from the JSON file
     *
     * @param userid
     * @returns {Promise<Array, String>}
     */
    async removeFilteredUser(userid) {
        return new Promise(((resolve, reject) => {
            this.getFilteredUsers()
                .then(users => {
                    if (!users.includes(userid)) reject("User is not in filtered users list");

                    let index = users.indexOf(userid);
                    if (index !== -1) {
                        users.splice(index, 1);
                    }

                    this.validateFile("filtered_users.json");
                    fs.writeFile("filtered_users.json", JSON.stringify(users), err => {
                        if (err) {
                            reject("Could not remove user from filtered list: " + err.message);
                        } else {
                            resolve(`Removed <@${userid}> from the filtered user list.`);
                        }
                    });
                })
                .catch(err => reject(err.message));
        }));
    }

    /**
     * Creates a file if it doesn't exist. Populates with an empty JSON array
     *
     * @param file
     */
    validateFile(file) {
        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, JSON.stringify([]));
        }
    }

    /**
     * Escapes string to be used in Regex
     * @param string
     * @returns {*}
     */
    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    /**
     *
     * @returns {Promise<Array>}
     */
    async getPatterns() {
        return this.readFile("filtered_patterns.json");
    }

    /**
     *
     * @param path
     * @returns {Promise<Array, String>}
     */
    async readFile(path) {
        await this.validateFile(path);

        return new Promise((resolve, reject) => {
            fs.readFile(path, "utf8", ((err, data) => {
                if (err) {
                    reject(err.message)
                } else {
                    try {
                        resolve(JSON.parse(data));
                    } catch (err) {
                        reject(err.message);
                    }
                }
            }))
        });
    }

    /**
     *
     * @param message Message
     * @returns {Promise<void>}
     */
    async testMessage(message) {
        if (message.author.bot) return;

        this.getFilteredUsers()
            .then(users => {
                if (users.includes(message.author.id) || this.getFilteredGroups().some(r => message.member._roles.includes(r))) {
                    // Got a filtered user
                    this.getPatterns()
                        .then(patterns => {
                            if (patterns.length < 1) return;

                            if (new RegExp(patterns.join("|").toLowerCase()).test(message.toString().toLowerCase())) {

                                console.log(`Removed a message from ${message.author.username}. Message was: '${message.toString()}'`)

                                // Got a filtered word
                                message.author.send("Your message was deleted because it contained filtered words.")
                                    .catch((reason => console.log(`Couldn't send a DM to ${message.author.username} because of: '${reason.message}'`)));
                                message.delete();
                            }
                        })
                        .catch(err => console.error(err));
                }

                return Promise.resolve();
            })
            .catch(err => console.error(err));
    }

};