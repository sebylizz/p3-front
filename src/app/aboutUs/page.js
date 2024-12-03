'use client';

import React from 'react';
import { MenuItem, Select, FormControl, InputLabel, Box, Typography } from '@mui/material';

const aboutUs = () => {
    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" sx={{ marginTop: '30px', marginBottom: '70px', textAlign: 'left', fontFamily:'sans-serif'}}>
                Welcome to the origin of Leghetto
            </Typography>
            <br></br>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '40px'}}>
                <img src="/logo1.png" alt="Logo" style={{ width: '400px', height: 'auto' }} />
            </Box>
            <Box>
                <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center', fontSize: '24px', fontFamily: 'Zilla Slab, seri' }}>
                    Lorem Ipsum
                </Typography>
                <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center', fontSize: '16px', fontFamily: 'Zilla Slab, seri' }}>
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
                <br></br>
                "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
                </Typography>
                <Typography variant="h4" sx={{ marginBottom: '100px', textAlign: 'center', fontSize: '16px', fontFamily: 'Zilla Slab, seri', padding: '20px', wordWrap: 'break-word'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus odio ut enim rutrum vestibulum. Nam odio mi, imperdiet quis
                mollis at, fermentum nec lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas blandit dictum imperdiet. Ut in bibendum arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras vel erat nibh. Proin sed pellentesque lorem, ac pulvinar urna. Fusce scelerisque dolor et lacus dapibus mollis.
                Duis sed rhoncus diam. Maecenas sed purus hendrerit arcu commodo dignissim. Pellentesque lobortis ultricies velit sit amet maximus. Mauris laoreet blandit ex at ornare. Pellentesque orci nunc, condimentum sed lacus vitae, volutpat egestas elit. Maecenas eu nunc augue. Phasellus viverra vitae nibh eget auctor. Curabitur rutrum mollis ante. Donec efficitur ipsum tortor, in dapibus sapien imperdiet et. Morbi consequat quis ante sed convallis. Quisque ultricies quam vitae fermentum facilisis.
                onec ut aliquet dui. Praesent sodales velit auctor nisl luctus mollis. Vestibulum ac pretium lorem. Vivamus aliquet sem ac fermentum egestas. Duis laoreet rhoncus volutpat. Donec lacinia neque in tristique vulputate. Aliquam erat volutpat.
                Duis mattis eros ut ipsum ultricies, ut lacinia mi tincidunt. In laoreet congue laoreet. Vestibulum quis sollicitudin leo. Proin in tellus scelerisque lorem egestas tincidunt ut non sem. Duis porta maximus felis, et porttitor quam consectetur in. Donec id volutpat urna. Cras sit amet nunc eget nibh venenatis pharetra. Sed tempus turpis non urna volutpat facilisis. Suspendisse posuere dui in lacus scelerisque tincidunt. Aliquam iaculis gravida justo, vitae placerat magna placerat quis. Donec congue, leo eu sollicitudin interdum, leo massa eleifend odio, ut hendrerit est neque vitae tellus. Mauris cursus nec leo vehicula commodo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec mi velit, vestibulum non tortor vel, condimentum vestibulum nisi.
                Integer ullamcorper viverra felis, ac viverra massa laoreet nec. In in massa pretium augue laoreet consequat. Sed dictum, augue id egestas mollis, massa mauris consequat massa, vitae ultrices ligula arcu eleifend turpis. Aliquam suscipit erat leo, quis bibendum tellus mattis id. Sed vel nulla vitae ex accumsan pharetra. Mauris bibendum lectus justo, non mattis massa consequat at. Quisque vitae mi accumsan, luctus sem a, varius mauris. Praesent convallis massa sed purus luctus, et placerat enim tempor. Curabitur erat felis, euismod a commodo at, convallis ut arcu. Quisque luctus varius elit, pulvinar tempus quam rutrum et. Fusce lobortis augue mi, sit amet rhoncus quam sagittis et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                </Typography>
            </Box>
        </Box>
    );
};

export default aboutUs;
