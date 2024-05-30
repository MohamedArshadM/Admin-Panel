import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';

const createData = (id, Brand, status) => {
    return { id, Brand, status };
};

const BrandManagement = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks  
    const [rows, setRows] = useState([
        createData(1, 'Mobile', 'Active'),
        createData(2, 'Desktop', 'Inactive'),
    ]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [openDialog, setOpenDialog] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [editItemId, setEditItemId] = useState(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [openViewDialog, setOpenViewDialog] = useState(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedCategories, setSelectedCategories] = useState([]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedCategory, setSelectedCategory] = useState('');

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [brandOptions, setBrandOptions] = useState([]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [newItem, setNewItem] = useState({
        productName: '',
        status: '',
        category: '',
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [viewItem, setViewItem] = useState(null);

    const categories = ['Mobile', 'Laptop', 'Desktop'];

    const brands = {
        Mobile: ['Samsung', 'Apple', 'OnePlus'],
        Laptop: ['Dell', 'HP', 'Lenovo'],
        Desktop: ['Dell', 'HP', 'Asus'],
    };

    const handleDeleteClick = (id) => {
        setOpenDeleteDialog(true);
    };

    const handleDeleteConfirm = () => {
        setSelectedCategories((prevCategories) =>
            prevCategories.filter((category) => category !== selectedCategory)
        );
        setOpenDeleteDialog(false);
    };

    const handleDialogOpen = (editId) => {
        setEditItemId(editId);
        setOpenDialog(true);

        if (editId) {
            const editItem = rows.find((item) => item.id === editId);
            setNewItem({
                productName: editItem.Brand,
                status: editItem.status,
                category: '', // You can add category logic here
            });
        } else {
            setNewItem({
                productName: '',
                status: '',
                category: '',
            });
        }
    };

    const handleDialogClose = () => {
        setEditItemId(null);
        setOpenDialog(false);
    };

    const handleDialogConfirm = () => {
        if (editItemId) {
            // Edit operation
        } else {
            if (newItem.productName && newItem.status && newItem.category) {
                const newItemData = createData(
                    rows.length + 1,
                    newItem.productName,
                    newItem.status
                );

                setRows([...rows, newItemData]);
            }
        }

        setEditItemId(null);
        setNewItem({
            productName: '',
            status: '',
            category: '',
        });

        setSelectedCategory(''); // Clear the selected category

        setOpenDialog(false);
    };

    const handleTextFieldChange = (field, value) => {
        setNewItem((prevItem) => ({
            ...prevItem,
            [field]: value,
        }));
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setBrandOptions(brands[event.target.value] || []);
    };

    const handleViewClick = (row) => {
        setViewItem({
            productName: row.Brand,
            status: row.status,
            selectedCategory: row.categories, 
            brandOptions: brands[row.Brand] || [],
        });
        setOpenViewDialog(true);
    };

    const handleCategoryPrint = () => {
        if (selectedCategory && !selectedCategories.includes(selectedCategory)) {
            setSelectedCategories([...selectedCategories, selectedCategory]);
        }
    };

    const handleAddBrand = () => {
        if (selectedCategory && newItem.productName && newItem.status) {
            const newItemData = createData(
                rows.length + 1,
                newItem.productName,
                newItem.status
            );

            setRows([...rows, newItemData]);
            setOpenDialog(false);
        }
    };


    return (
        <div style={{ margin: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
            <TableContainer component={Paper}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ float: 'right', margin: '10px' }}
                    onClick={() => handleDialogOpen()}
                >
                    Add Item
                </Button>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead >
                        <TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    '&:last-of-type td, &:last-of-type th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.Brand}
                                </TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleDialogOpen(row.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        style={{ marginLeft: '8px' }}
                                        onClick={() => handleViewClick(row)}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        style={{ marginLeft: '8px' }}
                                        onClick={() => handleDeleteClick(row.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
            >
                <DialogTitle>Delete Item</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this item?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                sx={{ minWidth: 750 }}
            >
                <DialogTitle>{editItemId ? 'Edit Item' : 'Add New Item'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        id="productName"
                        fullWidth
                        value={newItem.productName}
                        onChange={(e) => handleTextFieldChange('productName', e.target.value)}
                    />
                    <TextField
                        label="Status"
                        id="status"
                        fullWidth
                        select
                        value={newItem.status}
                        onChange={(e) => handleTextFieldChange('status', e.target.value)}
                    >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </TextField>

                    <TextField
                        label="Category"
                        id="category"
                        fullWidth
                        select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="contained" color="primary" onClick={handleCategoryPrint} style={{ marginTop: '10px' }}>
                        Add Brand
                    </Button>
                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
                        {selectedCategories.map((category) => (
                            <div key={category} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: '5px' }}>{category}</span>
                                <DeleteIcon
                                    onClick={() =>
                                        setSelectedCategories((prevCategories) =>
                                            prevCategories.filter((cat) => cat !== category)
                                        )
                                    }
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        ))}
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    {editItemId ? (
                        <Button onClick={handleDialogConfirm} color="primary">
                            Save
                        </Button>
                    ) : (
                        <Button onClick={handleAddBrand} color="primary">
                            Add Brand
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
            <Dialog
                open={openViewDialog}
                onClose={() => setOpenViewDialog(false)}
            >
                <DialogTitle>Item Details</DialogTitle>
                <DialogContent>
                    <div style={{ width: '500px' }}>
                        <p><strong>Name:</strong> {viewItem && viewItem.productName}</p>
                        <p><strong>Status:</strong> {viewItem && viewItem.status}</p>
                        <p><strong>Category:</strong> {viewItem && viewItem.selectedCategory}</p>
                        <p><strong>Brand Options:</strong> {viewItem && viewItem.brandOptions.join(', ')}</p>
                        {/* Add other details here */}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenViewDialog(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BrandManagement;
