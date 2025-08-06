module.exports = function(config){
    if (config.backend) {
        // Add side panel
        config.backend.customObjectTypes.myobject = {
            sidepanel: '<div><label>Counter:</label><span>{{object.counter}}</span></div>'
        };

        //Add visuals, see examples in renderer
        config.backend.renderer.resources['my_gift_texture'] = 'gift.png';
        config.backend.renderer.metadata['gift'] = {
            calculations: [
                {
                    id: 'displayCounter',
                    props: ['counter'],
                    func: { $state: 'counter' }
                }
            ],
            processors: [
                {
                    type: 'sprite',
                    once: true,
                    payload: {
                        texture: 'my_gift_texture',
                        width: 100,
                        height: 100,
                    }
                },
                {
                    type: 'text',
                    props: ['counter'],
                    payload: {
                        text: { $calc: 'displayCounter' },
                        style: { align: 'center', fill: '#000000', fontSize: 50, fontWeight: 'bold' },
                        anchor: { x: 0.5, y: 0.5 }
                    }
                }
            ]
        };
    }

    /*if (config.engine) {
        // Add MyObject prototype to user scripts
        config.engine.registerCustomObjectPrototype('gift', 'MyObject', {
            properties: {
                counter: object => object.counter
            },
            prototypeExtender(prototype, scope) {
                prototype.getCounter = function () {
                    scope.globals.console.log('Current counter is:', this.counter);
                    return this.counter + '!';
                }
            },
            findConstant: 10000
        });

        // Increment the counter each tick
        config.engine.on('processObject', function (object, roomObjects, roomTerrain, gameTime,
            roomInfo, objectsUpdate, usersUpdate) {

            if (object.type == 'myobject') {
                objectsUpdate.update(object, {
                    counter: object.counter + 1
                });
            }
        });
    }*/
}