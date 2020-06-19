const ac = require('accesscontrol');
let access = new ac.AccessControl()

exports.ac = () => {
    access.grant('user')
        .createOwn('post')
        .deleteOwn('post')
        .updateOwn('post')
        .readAny('post')
      .grant('admin')
        .extend('user')
        .createAny('user')
        .deleteAny('user')
        .deleteAny('post')
        .updateAny('user')
        .readAny('post')
    return access
}
