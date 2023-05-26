
module.exports = {
    apps: [
        {
            name: "PAYMENET:GATEWAY:V2",
            script: "npm start",
            instances: "1",
            // exec_mode: 'cluster',

            // watch: true,
            watch: "./dumpStaticUtils/registry/registry.json",
            time: true,
        },
    ],
};
