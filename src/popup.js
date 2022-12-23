import React, { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CustomText, CustomLinkButton, CustomRadio, CustomAutoComplete } from './template';
import { schemaList } from './utils';
import { Grid } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
export default function Popup({ open, handleClose }) {

    const [selectedSchema, setSelectedSchema] = useState({})
    const [segment_name, setSegmentName] = useState('')
    const [schemaData, setSchemaData] = useState([])
    const activeSchemaList = schemaList.filter(f => schemaData.some(s => Object.keys(s).includes(f.Value)))
    const handleTextChange = (i) => (e) => {
        const { name, value } = e.target
        const temp = [...schemaData]
        temp[i] = { [name]: value }
        setSchemaData(temp)
    }

    const handleRemove = (index) => {
        let S_Data = [...schemaData]
        S_Data.splice(index, 1)
        setSchemaData(S_Data)
    }
    const handleAutoComplete = (i) => (name, optionLabel, val) => {
        const temp = [...schemaData]
        temp[i] = { [name]: val[optionLabel] }
        setSchemaData(temp)
    }

    const handleSubmit = () => {
        const data = {
            'segment_name': segment_name,
            'schema': schemaData
        }
        console.log("handleSubmit", data)
        alert(JSON.stringify(data))
    }

    useEffect(()=>{
       return ()=>{
        setSelectedSchema({})
        setSegmentName('')
        setSchemaData([])
       }
    },[open])

    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth={'md'} >
                <DialogTitle>Saving Segments</DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}>
                        <Grid item xs={12} sm={12} md={8} lg={8} >
                            <CustomText label={'Enter the Name of Segment'} name={'segment_name'} value={segment_name} onChange={() => (e) => setSegmentName(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}  >
                            <span>
                                to save your segment, you need to add the schemas
                                to build the query
                            </span>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>


                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                                sx={{ border: schemaData.length > 0 ? '3px solid blue' : '' }}
                            >
                                {activeSchemaList.map((s, i) => {
                                    return <>
                                        <Grid item xs={8} sm={8} md={6} lg={6} key={i}>
                                            {
                                                s.type === 'Text' ? <CustomText i={i} value={schemaData[i][s.Value] ? schemaData[i][s.Value] : ''} label={s.Label} name={s.Value} onChange={handleTextChange} /> :
                                                    s.type === 'Select' ?
                                                        <CustomAutoComplete i={i} name={s.Value} options={s.options} optionLabel={s.optionLabel} label={s.Label} onChange={handleAutoComplete(i)} /> :
                                                        s.type === 'Radio' ?
                                                            <CustomRadio i={i} title={s.Label} name={s.Value} value={schemaData[i][s.Value] ? schemaData[i][s.Value] : ''} options={s.options} onChange={handleTextChange} /> : <></>

                                            }
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={2} lg={2} key={i}>
                                            <RemoveIcon onClick={() => handleRemove(i)} />
                                        </Grid>
                                    </>
                                })}

                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={8} lg={8}  >
                            <CustomAutoComplete name={'schemaList'} value={selectedSchema} options={schemaList.filter(f => !schemaData.some(s => Object.keys(s).includes(f.Value)))} optionLabel={'Label'} label={'Add Schema to Segment'} onChange={(e, optionLabel, val) => { setSelectedSchema(val) }} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={8}  >
                            <CustomLinkButton onClick={(e) => { setSchemaData([...schemaData, { [selectedSchema.Value]: '' }]) }} component={'button'} disabled={schemaData.filter(f => Object.keys(f).includes(selectedSchema.Value)).length > 0} label={'+ Add new schema'} />

                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={schemaData.length === 0}>Save Segments</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}