import React from 'react'

function Ad() {

    return (
        <div className="adcontainer">
            <div className="sponserd">
                sponserd
            </div>
            <div className="adcontent">
                <div className="imgContainer">
                    <img className="img" src={require('./x.png').default} />
                </div>
                
                <div className="adcontentContainer">
                    <div className="adtitle">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim delectus quam eos voluptatum nesciunt. Amet perferendis, unde eligendi ratione fuga, dolorum magnam voluptates et, ipsum facere soluta non quia voluptatem.
                    </div>
                    <div className="adSub">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim delectus quam eos voluptatum nesciunt. Amet perferendis, unde eligendi ratione fuga, dolorum magnam voluptates et, ipsum facere soluta non quia voluptatem.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim delectus quam eos voluptatum nesciunt. Amet perferendis, unde eligendi ratione fuga, dolorum magnam voluptates et, ipsum facere soluta non quia voluptatem.
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Ad


