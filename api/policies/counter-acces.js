/**
 * is-logged-in
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function (req, res, proceed) {

    // If `req.me` is set, then we know that this request originated
    // from a logged-in user.  So we can safely proceed to the next policy--
    // or, if this is the last policy, the relevant action.
    // > For more about where `req.me` comes from, check out this app's
    // > custom hook (`api/hooks/custom/index.js`).

    console.log( "Find User Agent" + req.get('user-agent'));
    info =  req.get('user-agent')
    useragent = {
      browser: info
    }
   
  //  req.useragent.browser,
  //  version: req.useragent.version,
  //  os: req.useragent.os,
  //  platform: req.useragent.platform
      useragentStr = JSON.stringify(useragent)
      findResource = await AccCounter.find({useragent:useragentStr});
      timestamp = Date.now().toString();

      ///Counter new and last access
      if (typeof findResource !== undefined && findResource.length > 0){ 
        resource = findResource[0]
        newcounter = resource.acccounter + 1
        await AccCounter.update({useragent:useragentStr}).set({acccounter:newcounter, moment:timestamp})
      }
      else 
       await AccCounter.create({useragent:useragentStr, acccounter:1, moment:timestamp})


      return proceed();
  
  
  };
  