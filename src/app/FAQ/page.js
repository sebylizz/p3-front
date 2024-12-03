'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Collapse } from '@mui/material';



const FAQ = () => {

    //add op the opened palettes via. an array:
    const[openIndices, setOpenIndices] = useState([])

    const toggleVisibility = (index) => {
        //If the index of the palette is in the array, close it
        if (openIndices.includes(index)) {
            setOpenIndices(openIndices.filter((i) => i !== index));
        } else
            //If the index of the palette is not in the array, open it
            setOpenIndices([...openIndices, index])
    };

    const faqitem = [
        { question: "What is the brand style for Leghetto?", 
            answer: "Det må de ik. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam purus, auctor at finibus vel, facilisis in felis. Fusce pretium quis risus eu lobortis. Proin pulvinar elementum felis, pharetra vehicula augue iaculis vulputate. Duis vitae leo fermentum, tincidunt ipsum non, dignissim quam. Integer quis ligula turpis. In hac habitasse platea dictumst. Cras purus diam, blandit vel sem non, auctor sodales erat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras est turpis, dictum at lectus at, condimentum fringilla erat. Sed eleifend erat vel odio faucibus efficitur. Duis a orci nec ipsum faucibus elementum. Integer accumsan nibh ac lorem porta lobortis. In leo justo, rutrum id odio ac, dictum ornare turpis. Mauris eu ante odio. Sed a mauris rutrum, ultrices magna quis, sagittis arcu. Morbi sed commodo risus. Donec consequat massa ut urna varius, in condimentum tellus pellentesque. Proin felis turpis, blandit vitae sem sit amet, sollicitudin volutpat quam. Donec consectetur varius metus, eget rhoncus lacus. Proin elit nisl, consectetur convallis dictum vitae, convallis vel dolor. Nunc varius mi ipsum, vel varius purus mattis sed. Nulla et orci eget nunc aliquet auctor. Pellentesque sit amet neque id metus faucibus aliquam. Etiam pulvinar vehicula quam, ut fringilla dolor sollicitudin sit amet. Duis fermentum et ante sed consectetur. Cras sollicitudin consequat elit et euismod. Donec ex elit, accumsan et eros id, fringilla posuere felis. Quisque pulvinar risus in laoreet suscipit. Proin ornare sodales ipsum a fringilla. Integer in consequat magna. Nulla aliquam accumsan sem eget posuere. Morbi eget lacus ut massa volutpat tincidunt." },
        { question: "What is the delivery time for order?", 
            answer: "Ich weisse nicht. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis congue sagittis. In tempus arcu a eros fringilla, id interdum dui bibendum. Nam commodo felis leo, non placerat mi semper malesuada. Nunc malesuada mauris ac imperdiet tincidunt. Integer pellentesque tempor erat, vitae rhoncus arcu elementum a. Vivamus et convallis magna. Nulla efficitur vitae est at rutrum. Morbi lectus diam, vestibulum et blandit sed, eleifend et neque. Nunc ac rutrum lacus. Duis sodales quis lacus vel vestibulum. Donec nibh ipsum, ullamcorper eget neque quis, venenatis pellentesque tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec ultrices magna ac ipsum tincidunt laoreet ac sed eros. Aenean ipsum urna, efficitur non maximus ac, mollis non eros. Proin vitae ante egestas nulla efficitur varius. Mauris vel sapien ut sapien sagittis commodo sit amet sed est. Nulla facilisi. Pellentesque vulputate magna nec nisi porttitor finibus. Duis at tellus nec nunc aliquet euismod. Morbi in finibus leo. Pellentesque accumsan metus nec tellus iaculis, in suscipit ante porta. Cras nec massa placerat, consequat ligula vel, congue nulla. Donec ut aliquam eros, quis eleifend libero. Curabitur viverra tincidunt diam, quis fringilla nibh eleifend a. Suspendisse blandit lacus ut ipsum ornare, a maximus arcu lobortis. Nullam ipsum urna, efficitur id vestibulum id, tempus sed elit. Cras facilisis purus in dui maximus porta. Ut non justo id enim blandit luctus et ac ligula. Morbi et sem vitae ligula semper placerat. Maecenas malesuada eu eros ac tristique. Suspendisse varius nunc eu urna consectetur volutpat. Pellentesque eget augue porttitor, faucibus ipsum quis, venenatis nulla. Morbi nec vestibulum mauris." },
        { question: "What is the return policy?", 
            answer: "No return m8. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dictum risus in consectetur tempor. Vestibulum congue consequat tortor eget malesuada. Aliquam maximus turpis non magna tincidunt volutpat. Nullam pulvinar elit eu ex mattis, tristique efficitur ante vehicula. Curabitur interdum fringilla nisl, a volutpat odio varius quis. Mauris lacinia quam sit amet malesuada volutpat. Nullam a egestas libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce interdum lobortis lectus, vitae ultricies mauris congue a. Sed non ante ac magna consectetur dictum lobortis vehicula urna. Proin tristique finibus massa, blandit ultrices quam venenatis quis. Donec dolor mi, pretium vitae turpis vel, pellentesque sodales lacus. Cras in sodales elit, sit amet fringilla arcu. Nam est ligula, rutrum sed condimentum pharetra, dapibus non turpis. Suspendisse blandit eleifend lobortis. Aliquam ac sapien id sem molestie maximus. Vestibulum sollicitudin tellus sed leo consequat, id laoreet augue bibendum. Donec at facilisis purus. Morbi vel lacus eu libero rhoncus mollis. Phasellus feugiat fermentum augue ultrices luctus. Vivamus semper interdum est euismod venenatis. Phasellus ac metus at risus luctus consequat id sed risus. Etiam placerat convallis libero non malesuada. Mauris laoreet tempus turpis, at efficitur ex vehicula eget. Duis a luctus nibh. Etiam ultrices nulla at tortor mattis fringilla. Sed aliquam orci aliquet orci rutrum bibendum. Nam auctor tortor ut ligula fringilla vestibulum. Proin ultricies eros id orci condimentum, ut hendrerit quam sagittis. Etiam at mi non eros eleifend tristique eget eget risus. Maecenas sed luctus tortor. Fusce auctor vitae dui vitae suscipit. Phasellus a metus enim. Praesent tempus, dolor ac fermentum ullamcorper, lectus metus rutrum tellus, ac imperdiet nibh magna sit amet augue. Duis facilisis, sem eu auctor iaculis, lectus velit cursus orci, ac vestibulum arcu mauris maximus elit." },
    ];

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" sx={{ marginTop: '30px', marginBottom: '50px', textAlign: 'left' }}>
                Frequently Asked Questions
            </Typography>

            {faqitem.map((item, index) => (
                <Box key={index} sx={{ marginBottom: '10px' }}>
                    <Button
                        variant="contained"
                        onClick={() => toggleVisibility(index)}
                        sx={{
                            width: '100%',
                            background: 'black',
                            textTransform: 'none',
                            color: 'white'
                        }}
                    >
                        {item.question}
                    </Button>
                    <Collapse in={openIndices.includes(index)}>
                        <Box
                            sx={{
                                margin: '1px 0',
                                padding: '20px',
                                border: '1px solid #ccc',
                                backgroundColor: '#f9f9f9',
                                textAlign: 'left',
                            }}
                        >
                            <Typography variant="body1">{item.answer}</Typography>
                        </Box>
                    </Collapse>
                </Box>
            )
            )
            }
        </Box>
    );
};


export default FAQ;
