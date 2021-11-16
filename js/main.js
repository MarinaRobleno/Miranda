const openButton = document.getElementById("hamburger-button");
let dropdownContent = document.getElementById("drop-down-box");
let isHidden = true;

//Hamburger menu function
function openDropdown(){
    if(isHidden === true){
        dropdownContent.style.display = 'block';
        //dropdownContent.classList.add('drop-down-box--visible');
        isHidden = false;
    }else{
        dropdownContent.style.display = 'none';
        //dropdownContent.classList.remove('drop-down-box--visible');
        isHidden = true;
    }
}
openButton.addEventListener('click', openDropdown);