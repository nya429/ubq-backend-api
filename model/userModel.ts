/*jslint esversion:6 */
    export class User  {
         _userId: number;
         _role: number;
         _email: string;
         _firstName: string;
         _lastName: string;
         _vendorId: number;
         _displayConfig: object;
         _password: string;
         _sessionToken: string;
         _createTime: number;
         _updateTime: number;
        
        getUserId () {
            return this._userId;
        }
    
        getRole () {
            return this._role;
        }
    
        setRole (role) {
            this._role = role;
        }
    
        getEmail () {
            return this._email;
        }
    
        setEmail (email) {
            this._email = email;
        }
    
        getFirstName () {
            return this._firstName;
        }
    
        setFirstName (firstName) {
            this._firstName = firstName;
        }
    
        getVendorId () {
            return this._vendorId;
        }
    
        getDisplayConfig () {
            return this._displayConfig;
        }
    
        getPassword () {
            return this._password;
        }
    
        getSessionToken() {
            return this._sessionToken;
        }
    
        getCreateTime () {
            return this._createTime;
        }
    
        getUpdateTime () {
            return this._updateTime;
        }
    
        get (name: string) {
            return this[`_${name}`];
        }
    
        set (name: string, value:any) {
            this[`_${name}`] = value;
        }
    }

// module.exports = User