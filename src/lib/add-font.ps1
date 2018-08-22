#requires -version 4
<#
  .SYNOPSIS
    This powershell script installs a font file into Windows
  
  .DESCRIPTION
    Windows recognizes fonts dragged and dropped into the Windows font folder, but does not recognize fonts copied through cli or script. This is due to the windows explorer shell triggering a font registration process.  This script evokes the same windows explorer shell trigger that moves and registers fonts
    
  .PARAMETER 
    Path to font file or folders containing font files (*.fon,*.fnt,*.otf,*.ttc,*.ttf)
  
  .EXAMPLE

    Add-Font "C:\temp\"

    Add-Font "C:\temp\*"
    
    Add-Font "C:\temp\Arial.otf"

    Add-Font "C:\temp\Arial.otf", "C:\temp\Helvetica.ttf"

    Add-Font "C:\temp\Arial.otf" "C:\temp\Helvetica.ttf"
    
    "C:\temp\*" | Add-Font
    
    "C:\temp\Arial.otf" | Add-Font
    
    "C:\temp\Arial.otf","C:\temp\Helvetica.ttf" | Add-Font
  
  .NOTES
    Version: 1.0
    Author: Mike Stine
    Creation Date: 7/11/2018
    This script is Idempotent
    Unregistered powershell scripts are restricted by default.  run the powershell command 'Set-ExecutionPolicy unrestricted' as an administrator before executing this script.  
    
  .LINK

#>
 
#--------------------------------[Parameters]--------------------------------

[CmdletBinding()]

Param(
  [Parameter(Mandatory = $false, ValueFromPipeline = $true, ValueFromRemainingArguments = $true)]
  [alias("file","files","path","paths","font","fonts")]
  [ValidateScript({
      foreach($path in $_){
        if( -Not ($path | Test-Path) ){
            throw "File or folder does not exist"
        }
      }
      return $true
  })]
  [string[]]$fontPaths = @('C:\temp\*')
)

Begin { echo "BEGIN Add-Font.ps1" }

Process {
  # This is the folder(s) that contains the font(s) to install, or this can be a direct path to a font
  # loop through parameters
  foreach($fontPath in $fontPaths) {
    echo "fontPath: $fontPath"
    
    # Find files with file extensions *.fon,*.fnt,*.otf,*.ttc,*.ttf
    $fontFiles = Get-ChildItem -Path "$fontPath" -Include *.fon,*.fnt,*.otf,*.ttc,*.ttf -Recurse

    if (@($fontFiles).count -gt 0) {
        # Creates new Shell.Application COM object
        $shellObject = New-Object -ComObject Shell.Application

        # Sets object's namespace to CLSID hex '0X14' (Windows font folder and registration trigger)
        $windowsFontFolder = $shellObject.Namespace(0x14)

        # Move and register font files
        foreach($fontFile in $fontFiles) {
          # Skip if font is already installed 
          if ( !(Test-Path "${env:windir}\Fonts\$($fontFile.Name)") ) {
            # Install font
            echo "INSTALL: $($fontFile.fullname)"
            $windowsFontFolder.CopyHere($fontFile.fullname)
          } else {
            echo "SKIPPING -Already Installed: $fontFile.Name"
          }
        }

    } else {
        throw "Font could not be found to install!"
    }
    
  }
}

End { echo "End Add-Font.ps1" }
