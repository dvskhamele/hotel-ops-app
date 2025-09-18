#!/bin/bash

# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║                           🏨 HOTEL OPS LAUNCHER                            ║
# ║                      Quick Access to Hotel Operations                      ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Emojis
HOTEL="🏨"
SUCCESS="✅"
ERROR="❌"
WARNING="⚠️"
ROCKET="🚀"
OPEN="🌐"
HEART="💖"

# Base directory
BASE_DIR="/Users/test/startups/hotelmanagement/hotel-ops-app"

# Print header
print_header() {
    echo -e "${CYAN}╔══════════════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║${NC}                           ${HOTEL} HOTEL OPS LAUNCHER ${HOTEL}                          ${CYAN}║${NC}"
    echo -e "${CYAN}║${NC}                      Quick Access to Hotel Operations                      ${CYAN}║${NC}"
    echo -e "${CYAN}╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

# Print success message
print_success() {
    echo -e "${GREEN}${SUCCESS} $1${NC}"
}

# Print error message
print_error() {
    echo -e "${RED}${ERROR} $1${NC}"
}

# Print warning message
print_warning() {
    echo -e "${YELLOW}${WARNING} $1${NC}"
}

# Print info message
print_info() {
    echo -e "${CYAN}$1${NC}"
}

# Main function
main() {
    clear
    print_header
    
    # Check if directory exists
    if [ ! -d "$BASE_DIR" ]; then
        print_error "HotelOps directory not found at $BASE_DIR"
        exit 1
    fi
    
    cd "$BASE_DIR"
    
    # Check if index.html exists
    if [ ! -f "index.html" ]; then
        print_error "index.html not found in $(pwd)"
        exit 1
    fi
    
    print_info "📍 Current directory: $(pwd)"
    print_info "📄 Opening HotelOps application..."
    echo ""
    
    # Try to open in browser
    if command -v open &> /dev/null; then
        # macOS
        open "index.html"
        print_success "HotelOps opened in your default browser!"
    elif command -v xdg-open &> /dev/null; then
        # Linux
        xdg-open "index.html"
        print_success "HotelOps opened in your default browser!"
    elif command -v cmd &> /dev/null; then
        # Windows
        cmd /c start index.html
        print_success "HotelOps opened in your default browser!"
    else
        # Fallback
        ABSOLUTE_PATH="file://$(pwd)/index.html"
        print_warning "Could not automatically open browser"
        echo ""
        print_info "📋 Please open the following URL in your browser:"
        echo -e "${WHITE}$ABSOLUTE_PATH${NC}"
        echo ""
        print_info "Or copy and paste this into your browser:"
        echo -e "${CYAN}$ABSOLUTE_PATH${NC}"
        exit 1
    fi
    
    echo ""
    print_info "🏨 ${WHITE}Welcome to HotelOps!${NC} ${HEART}"
    print_info "✨ Enjoy managing your hotel operations!"
    echo ""
}

# Handle Ctrl+C gracefully
trap 'echo ""; print_info "👋 Goodbye!"; exit 0' INT TERM

# Run main function
main "$@"