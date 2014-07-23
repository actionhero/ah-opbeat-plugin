## notes
- be sure to enable the plugin within actionhero (`config/api.js`)
- you will need to add the opbeat package (`npm install opbeat --save`) to your package.json

You can add a deployment drunt task to clear the previous deploy's errors:
```javascript
grunt.registerTask('notifyOpbeatDeploy','tell opbeat we deployed',function(message){
  var done = this.async()
  init(function(api){
    XXX
    XXX
    XXX
  })
})
```
