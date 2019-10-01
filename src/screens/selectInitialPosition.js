import React, { Component } from 'react'

import { 
    ViroScene,
    ViroBox,
    ViroController,
    Viro360Image,
    Viro3DObject
} from 'react-viro'

import BACKGROUND_GRID from '../assets/images/360_grid.jpg'
import BTN_OBJECT from '../assets/objects/btn_sphere.obj'

const PI = Math.PI;
const RADIUS = 2;
const PARALLELS = 2;
const ANGELS = [0, PI/4, PI/2, 3 * PI/4, PI, 5 * PI/4, 3 * PI/2, 7 * PI/4, 2 * PI];

class selectInitialPosition extends Component {

    constructor(props) {
        super(props);

        this.state = {
            position: [0,0,0]
        }
    }
    
    generateRange = (LENGTH) => {
        let range = [];
        
        for(i = -LENGTH; i <= LENGTH; i++) {
            range.push(i);
        }

        return range;
    }

    drawParalels = () => {
        const range = this.generateRange(PARALLELS);

        return range.map(rad => this.drawSelectionBoxes(rad))
    }

    _onSelectionHover = (isHovering, ref) => {
        if(isHovering) {
            this.refs[ref].setNativeProps({ scale: [.15, .15, .15] });
        } else {
            this.refs[ref].setNativeProps({ scale: [.1, .1, .1] });
        }
    }

    _setPosition = (position) => {
        this.setState({ position })
    }

    drawSelectionBoxes = (Y_COORDINATE) => {        
        return ANGELS.map(angel => {    
            let x = Math.cos(angel) * (RADIUS - Math.abs(Y_COORDINATE));
            let z = Math.sin(angel) * (RADIUS - Math.abs(Y_COORDINATE));
            let y = Y_COORDINATE;

            return <Viro3DObject
                onFuse={() => this._setPosition([x,y,z])}
                onHover={isHovering => this._onSelectionHover(isHovering, `ref_${x}${y}${z}${angel}`)}
                key={`${x}${y}${z}${angel}`}
                ref={`ref_${x}${y}${z}${angel}`}
                source={BTN_OBJECT}
                highAccuracyEvents={true}
                position={[x, y, z]}
                scale={[.1, .1, .1]}
                type="OBJ"
                transformBehaviors={["billboard"]}/>
        })
    }

    render() {
        return (
            <ViroScene>
                <ViroController reticleVisibility={true} />
                <Viro360Image source={BACKGROUND_GRID} />
                {this.drawParalels()}
            </ViroScene>
        )
    }
}

export default selectInitialPosition;