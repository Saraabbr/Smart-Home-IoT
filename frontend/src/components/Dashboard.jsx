import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import EmojiObjectsRoundedIcon from '@mui/icons-material/EmojiObjectsRounded';
import LocalLaundryServiceRoundedIcon from '@mui/icons-material/LocalLaundryServiceRounded';
import TvRoundedIcon from '@mui/icons-material/TvRounded';
import MicrowaveRoundedIcon from '@mui/icons-material/MicrowaveRounded';
import HvacRoundedIcon from '@mui/icons-material/HvacRounded';
import HeatPumpIcon from '@mui/icons-material/HeatPump';
import ComputerIcon from '@mui/icons-material/Computer';
import SpeakerGroupRoundedIcon from '@mui/icons-material/SpeakerGroupRounded';
import BlindsRoundedIcon from '@mui/icons-material/BlindsRounded';
import ElectricalServicesRoundedIcon from '@mui/icons-material/ElectricalServicesRounded';
import Icon from '@mdi/react';
import { mdiChandelier, mdiDishwasher, mdiFridge } from '@mdi/js';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [devices, setDevices] = useState([]);
    const [totalEnergyConsumption, setTotalEnergyConsumption] = useState(0);
    const [open, setOpen] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);

    useEffect(() => {
        fetchDevices();
        fetchTotalEnergyConsumption();
    }, []);

    const fetchDevices = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/devices/');
            setDevices(response.data);
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };

    const fetchTotalEnergyConsumption = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/devices/energy_consumption/total/');
            setTotalEnergyConsumption(response.data.total_energy_consumption);
        } catch (error) {
            console.error('Error fetching total energy consumption:', error);
        }
    };

    const handleClickOpen = (device) => {
        setSelectedDevice(device);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedDevice(null);
    };

    const handleToggleDevice = async () => {
        if (!selectedDevice) return;

        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/devices/${selectedDevice.id}/is_on/`, {
                is_on: !selectedDevice.is_on,
            });
            if (response.status === 200) {
                setDevices(prevDevices =>
                    prevDevices.map(device =>
                        device.id === selectedDevice.id
                            ? { ...device, is_on: !device.is_on }
                            : device
                    )
                );
                setTotalEnergyConsumption(response.data.total_energy_consumption);
                handleClose();
            }
        } catch (error) {
            console.error('Error toggling device:', error);
        }
    };

    const getIcon = (device) => {
        const iconStyle = {
            fontSize: '56px',
            color: device.is_on ? 'green' : 'gray'
        };

        switch (device.name) {
            case 'lamp':
                return <EmojiObjectsRoundedIcon style={iconStyle} />;
            case 'washing_machine':
                return <LocalLaundryServiceRoundedIcon style={iconStyle} />;
            case 'chandelier':
                return <Icon path={mdiChandelier} size={2.5} style={iconStyle} />
            case 'tv':
                return <TvRoundedIcon style={iconStyle} />
            case 'microwave':
                return <MicrowaveRoundedIcon style={iconStyle} />
            case 'dishwasher':
                return <Icon path={mdiDishwasher} size={2.5} style={iconStyle} />
            case 'fridge':
                return <Icon path={mdiFridge} size={2.5} style={iconStyle} />
            case 'air_conditioner':
                return <HvacRoundedIcon style={iconStyle} />
            case 'heater':
                return <HeatPumpIcon style={iconStyle} />
            case 'computer':
                return <ComputerIcon style={iconStyle} />
            case 'speaker':
                return <SpeakerGroupRoundedIcon style={iconStyle} />
            case 'blinds':
                return <BlindsRoundedIcon style={iconStyle} />
            case 'plug':
                return <ElectricalServicesRoundedIcon style={iconStyle} />
            default:
                return null;
        }
    };

    return (
        <Container fluid className="dashboard">
            <Row className="justify-content-center align-items-center mt-3">
                <Col xs={12} className="text-center">
                    <div className="title">
                        Smart Home Control
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-center align-items-center map-container">
                <Col xs={12} className="map">
                    {devices.map(device => {
                        const [x, y] = device.location.split(',').map(coord => `${coord}px`);
                        return (
                            <IconButton
                                key={device.id}
                                style={{ top: y, left: x, position: 'absolute' }}
                                onClick={() => handleClickOpen(device)}
                            >
                                {getIcon(device)}
                            </IconButton>
                        );
                    })}
                </Col>
            </Row>
            <Row className="justify-content-center align-items-center mt-3">
                <Col xs={12} className="text-center">
                    <div className="total-energy">
                        Total Energy Consumption: {totalEnergyConsumption} kWh
                    </div>
                </Col>
            </Row>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    {selectedDevice?.is_on ? "Turn Off The Device" : "Turn On The Device"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to turn {selectedDevice?.is_on ? 'off' : 'on'} the {selectedDevice?.name_display}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleToggleDevice} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Dashboard;
