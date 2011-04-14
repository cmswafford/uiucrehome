#include <stdio.h>
#include <unistd.h>

int main()
{
  execl("/home/mark/www/uiucsd/scripts/insert_device.php", "/home/mark/www/uiucsd/scripts/insert_device.php", "3", "4", (char *) 0 );

  printf("Exit.\n");
  return 0;
}
